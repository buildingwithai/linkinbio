@echo off
echo Setting up Git repository and pushing to GitHub...

rem Initialize Git repository
"C:\Program Files\Git\bin\git.exe" init

rem Add all files
"C:\Program Files\Git\bin\git.exe" add .

rem Create initial commit
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit"

rem Add remote repository
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/buildingwithai/linkinbio.git

rem Push to GitHub (you'll need to provide credentials)
"C:\Program Files\Git\bin\git.exe" push -u origin master

echo Done! Check the output above for any errors.
pause 