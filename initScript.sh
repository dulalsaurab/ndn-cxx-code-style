#!/bin/bash

currentDir=$(pwd)
echo "code-style()
{
  node $currentDir/process.cli
}
alias code-style=code-style" >> ~/.bash_profile
