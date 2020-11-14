## Notes to remember

</^((?!.(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|webp|json|otf|map|mp4|mp3|xml|pdf)$).)*$/> redirects to /index.html status 200

Files with extensions not listed above will redirect to index.html. If you have trouble with specific file extensions, please remember to add them here in addition to the regexp in the rewrite console of Amplify.

ON Windows, you can't access locally hosted content from your phone :
This applies if you are running in WSL2/Linux
redirect network activity to allow for review of content from other devices on local netowork

If content is being served in WSL use the IP in WSL, and on port 3000
172.25.95.119:3000

** RUN AS ADMINISTRATOR IN POWERSHELL
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.17.29.206

convert line endings in files recursively: 
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -exec dos2unix {} \;