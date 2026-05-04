@echo off
echo ========================================
echo Pushing WhatsApp Clone to GitHub...
echo ========================================
cd /d D:\humbleTree\whatsapp-web-clone
git init
git remote add origin https://github.com/santhoshs2004/whatsapp_clone.git
git branch -M main
git add .
git commit -m "Final Submission: Premium WhatsApp Web Clone"
git push -u origin main
echo ========================================
echo PUSH COMPLETE! You can close this window.
echo ========================================
pause
