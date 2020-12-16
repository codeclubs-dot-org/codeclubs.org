import os
import traceback

from velocity.api import to_json
from velocity.web.conv import iconv
import velocity.aws

engine = velocity.aws.postgres()
gateway = velocity.aws.gateway()

DEBUG = os.environ['ENV'] != 'production'


def handler(event, context):
    return HttpEventHandler(event, context).serve()


@engine.class_wrapper
class HttpEventHandler(velocity.aws.LambdaHandler):
    def __init__(self, *args, **kwds):
        super().__init__(*args, **kwds)

        def OnActionDoSomething(self, tx, args, postdata, response):
            payload = postdata['payload']
            response['body'] = to_json({
                'status': 'ERROR',
                'message': "Not allowed",
                'payload': payload
            })
