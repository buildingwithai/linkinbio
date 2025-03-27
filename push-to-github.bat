@echo off
echo Pushing to GitHub...

"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Add shimmer animations to Spotify card and text"
"C:\Program Files\Git\bin\git.exe" push origin master

echo Done! 