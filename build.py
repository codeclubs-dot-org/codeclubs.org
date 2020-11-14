import os
import sys
import datetime
import pytz

def frontend():
    import boto3
    srv_list = [
        "css",
        "gif",
        "ico",
        "jpg",
        "js",
        "json",
        "map",
        "otf",
        "png",
        "svg",
        "ttf",
        "txt",
        "webp",
        "woff",
        "xml",
        "pdf",
    ]
    boto3.client('amplify').update_app(
        appId=os.environ['AWS_APP_ID'],
        customRules=[
            {
                'source': '/<*>',
                'target': '/index.html',
                'status': '404-200'
            }, {
                'source': f'</^[^.]+$|\.(?!({"|".join(srv_list)})$)([^.]+$)/>',
                'target': '/',
                'status': '200'
            },
        ],
    )

def backend():
    import boto3
    variables = {key: os.environ[key].strip() for key in [
        'DBDatabase',
        'DBHost',
        'DBUser',
        'DBPassword',
        'DBPort',

        'SlackToken',

        'AWS_BRANCH',
        'ProjectName',
    ]}

    variables['ENV'] = 'production' if os.environ['AWS_BRANCH'] == 'production' else 'develop'
    variables['REGION'] = 'us-east-1'

    c = boto3.client('lambda')
    for function in c.list_functions()['Functions']:
        if os.environ['ProjectName'] in function['FunctionName']:
            if f"-{os.environ['AWS_BRANCH']}" in function['FunctionName']:
                print(function['FunctionName'])
                boto3.client('lambda').update_function_configuration(
                    FunctionName=function['FunctionName'],
                    Environment={'Variables': variables},
                    Timeout=60 if 'Events' in function['FunctionName'] else 900
                )


def message_slack(channel, msg): 
    from slack import WebClient
    from slack.errors import SlackApiError  
    client = WebClient(token=os.environ['SlackToken'])
    try:
        response = client.chat_postMessage(
            channel=channel,
            text=msg)
        assert response["message"]["text"] == msg
    except SlackApiError as e:
        # You will get a SlackApiError if "ok" is False
        assert e.response["ok"] is False
        # str like 'invalid_auth', 'channel_not_found'
        assert e.response["error"]
        print(f"Got an error: {e.response['error']}")

def main():
    if len(sys.argv) > 1 and sys.argv[1] == 'backend':
        backend()
    if len(sys.argv) > 1 and sys.argv[1] == 'frontend':
        frontend()
    msg = [
        '--',
        f"ProjectName: {os.environ['ProjectName']}",
        f"Build Step for Git Branch: {os.environ['AWS_BRANCH']}",
        ]
    msg.append(f"AppID: {os.environ['AWS_APP_ID']}")
    if len(sys.argv) > 1:
        msg.append(f"Build Phase: {sys.argv[1]}")
    msg.append(f"Job ID: {os.environ['AWS_JOB_ID']}")
    msg.append(f"{sys.argv[1].title()} phase completed at {datetime.datetime.now(pytz.timezone('US/Mountain'))}")
    msg = '\n'.join(msg)    
    message_slack('#amplify-notifications', msg)

if __name__=="__main__":
    main()