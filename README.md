# ndn-cxx Code Style Checker for Local Environment

This project is forked from : <https://github.com/yoursunny/ndn-cxx-code-style>

This tool checks code against [ndn-cxx Code Style and Coding Guidelines](https://named-data.net/doc/ndn-cxx/current/code-style.html) for common mistakes.

### Prerequisites

**node** is required to execute **.js** file in local env

Node installation guide for MAC: <https://nodejs.org/en/download/>   
Node installation guide for Linux: <https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions>

```
e.g. node process.cli.js
```

### Installing

1. Clone this repo on your local machine, ``` git clone https://github.com/dulalsaurab/ndn-cxx-code-style.git ```
2. ```cd ndn-cxx-code-style```
3. run command ```./init-script.sh```
   This will create an alias for code-style in *bashrc* or *bash_profile* 
4. run ```source ~/.bashrc``` - for lunux , ```source ~/.bash_profile``` for mac 

now you can run ***code-style*** command from your terminal

```
code-style
```

**IMPORTANT!** code-style bot by default assumes that it's executed from **git repo**. If you want to execute it from outside the repo, please open *process.cli.js* file and change the configuration as advised there. 

### Running the tests

Assuming you are inside a git repo, simple execute ```code-style``` to view the result

Sample output: 

#### Acknowledgments

* Ashlesh Gawande 
* Junxiao Shi
