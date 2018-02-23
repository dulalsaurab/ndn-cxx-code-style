# ndn-cxx Code Style Checker for Local Environment

This project is forked from : <https://github.com/yoursunny/ndn-cxx-code-style>

This tool checks code against [ndn-cxx Code Style and Coding Guidelines](https://named-data.net/doc/ndn-cxx/current/code-style.html) for common mistakes.

### Prerequisites

**node** is required to execute **.js** file in local env
```
e.g. node process.cli.js
```
Node installation guide for MAC: <https://nodejs.org/en/download/>   
Node installation guide for Linux: <https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions>  
**Note:** apt-get install old version of node, make sure to follow the instruction above. 

### Installing

1. Clone this repo on your local machine, ``` git clone --depth 1 https://github.com/dulalsaurab/ndn-cxx-code-style.git ```
2. ```cd ndn-cxx-code-style```
3. run command ```./init-script.sh```
   This will create an alias for code-style in *bashrc* or *bash_profile*
4. run ```source ~/.bashrc``` - for linux , ```source ~/.bash_profile``` for mac
5. cd to your git repo, and you can run ***code-style*** command from your terminal

```
code-style
```

**IMPORTANT!** code-style bot by default assumes that it's executed from **git repo**. If you want to execute it from outside the repo, please open *process.cli.js* file and change the configuration as advised there.

### Running the tests

Assuming you are inside a git repo, simple execute ```code-style``` to view the result

Sample output:
![alt text](https://github.com/dulalsaurab/ndn-cxx-code-style/blob/master/code-style-bot-example?raw=true)


#### Acknowledgments

* Ashlesh Gawande
* Junxiao Shi
