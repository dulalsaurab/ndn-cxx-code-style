#!/bin/bash

currentDir=$(pwd)
echo "Installing code-style..."
codeStyle="code-style() { node $currentDir/process.cli; }; alias code-style=code-style"
if [ -f ~/.bashrc ]; then
   echo $codeStyle >> ~/.bashrc;        #for linux
elif [[ -f ~/.bash_profile ]]; then
   echo $codeStyle >> ~/.bash_profile;  #for mac
fi
echo "Completed..."
