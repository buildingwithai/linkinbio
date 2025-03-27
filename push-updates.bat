@echo off
echo Pushing updates to GitHub...

rem Add all changed files
"C:\Program Files\Git\bin\git.exe" add .

rem Create commit with message
set /p commit_message="Enter commit message: "
"C:\Program Files\Git\bin\git.exe" commit -m "%commit_message%"

rem Push to GitHub
"C:\Program Files\Git\bin\git.exe" push origin master

echo Done! Your changes have been pushed to GitHub.
pause 