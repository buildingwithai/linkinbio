@echo off
echo Configuring Git user details...

rem Configure Git user name and email (replace with your details)
"C:\Program Files\Git\bin\git.exe" config --global user.name "Jovanny"
"C:\Program Files\Git\bin\git.exe" config --global user.email "your-email@example.com"

echo Git configuration complete.
pause 