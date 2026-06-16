// CodeForge — snippets.js

const LANG_META = {
  python3:    { name:'Python 3',       file:'main.py'    },
  python2:    { name:'Python 2',       file:'main.py'    },
  javascript: { name:'JavaScript',     file:'main.js'    },
  typescript: { name:'TypeScript',     file:'main.ts'    },
  cpp:        { name:'C++ (C++17)',     file:'main.cpp'   },
  cpp14:      { name:'C++ 14',         file:'main.cpp'   },
  c:          { name:'C',              file:'main.c'     },
  java:       { name:'Java',           file:'Main.java'  },
  rust:       { name:'Rust',           file:'main.rs'    },
  go:         { name:'Go',             file:'main.go'    },
  ruby:       { name:'Ruby',           file:'main.rb'    },
  php:        { name:'PHP',            file:'main.php'   },
  csharp:     { name:'C# (Mono)',      file:'Main.cs'    },
  kotlin:     { name:'Kotlin',         file:'main.kt'    },
  swift:      { name:'Swift',          file:'main.swift' },
  objc:       { name:'Objective-C',    file:'main.m'     },
  bash:       { name:'Bash',           file:'main.sh'    },
  perl:       { name:'Perl',           file:'main.pl'    },
  lua:        { name:'Lua',            file:'main.lua'   },
  r:          { name:'R',              file:'main.r'     },
  sql:        { name:'SQL',            file:'main.sql'   },
  haskell:    { name:'Haskell',        file:'main.hs'    },
  scala:      { name:'Scala',          file:'main.scala' },
  fsharp:     { name:'F#',             file:'main.fsx'   },
  elixir:     { name:'Elixir',         file:'main.exs'   },
  erlang:     { name:'Erlang',         file:'main.erl'   },
  groovy:     { name:'Groovy',         file:'main.groovy'},
  cobol:      { name:'COBOL',          file:'main.cob'   },
};

const SNIPPETS = {
  hello: {
    python3:    `print("Hello, World!")\nprint("Welcome to CodeForge!")\n\nname = input("Enter your name: ")\nprint(f"Hello, {name}! Happy coding 🚀")\n\n# ✅ File I/O works\nwith open("output.txt", "w") as f:\n    f.write(f"Hello {name}")\nprint("File written successfully!")`,
    python2:    `print "Hello, World!"\nname = raw_input("Enter your name: ")\nprint "Hello, " + name + "!"`,
    javascript: `const readline = require('readline');\nconst fs = require('fs');\nconst rl = readline.createInterface({ input: process.stdin });\n\nconsole.log("Hello, World!");\nconsole.log("Welcome to CodeForge!");\n\nrl.question('', (name) => {\n  console.log(\`Hello, \${name}! Happy coding!\`);\n  // ✅ File I/O works\n  fs.writeFileSync('output.txt', \`Hello \${name}\`);\n  console.log('File written!');\n  rl.close();\n});`,
    typescript: `import * as readline from 'readline';\nconst rl = readline.createInterface({ input: process.stdin });\nconsole.log("Hello from TypeScript!");\nrl.question('', (name: string) => {\n  console.log(\`Hello, \${name}!\`);\n  rl.close();\n});`,
    cpp:        `#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << "Hello, World!" << endl;\n    cin >> name;\n    cout << "Hello, " << name << "! Happy coding!" << endl;\n    // ✅ File I/O works\n    ofstream f("output.txt");\n    f << "Hello " << name;\n    f.close();\n    cout << "File written!" << endl;\n    return 0;\n}`,
    cpp14:      `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string name;\n    cout << "Hello from C++14!" << endl;\n    cin >> name;\n    cout << "Hello, " << name << "!" << endl;\n    return 0;\n}`,
    c:          `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    char name[100];\n    printf("Hello, World!\\n");\n    scanf("%s", name);\n    printf("Hello, %s!\\n", name);\n    return 0;\n}`,
    java:       `import java.util.Scanner;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        Scanner sc = new Scanner(System.in);\n        System.out.println("Hello, World!");\n        String name = sc.nextLine();\n        System.out.println("Hello, " + name + "!");\n        // ✅ File I/O works\n        PrintWriter pw = new PrintWriter("output.txt");\n        pw.println("Hello " + name);\n        pw.close();\n        System.out.println("File written!");\n    }\n}`,
    rust:       `use std::io;\nuse std::fs;\n\nfn main() {\n    println!("Hello, World!");\n    let mut name = String::new();\n    io::stdin().read_line(&mut name).expect("Failed to read");\n    let name = name.trim();\n    println!("Hello, {}!", name);\n    // ✅ File I/O works\n    fs::write("output.txt", format!("Hello {}", name)).expect("Failed");\n    println!("File written!");\n}`,
    go:         `package main\n\nimport (\n    "bufio"\n    "fmt"\n    "os"\n    "strings"\n)\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    reader := bufio.NewReader(os.Stdin)\n    name, _ := reader.ReadString('\\n')\n    name = strings.TrimSpace(name)\n    fmt.Printf("Hello, %s!\\n", name)\n    // ✅ File I/O works\n    f, _ := os.Create("output.txt")\n    f.WriteString("Hello " + name)\n    f.Close()\n    fmt.Println("File written!")\n}`,
    ruby:       `puts "Hello, World!"\nname = gets.chomp\nputs "Hello, #{name}!"\n# ✅ File I/O works\nFile.write("output.txt", "Hello #{name}")\nputs "File written!"`,
    php:        `<?php\necho "Hello, World!\\n";\n$name = trim(fgets(STDIN));\necho "Hello, $name!\\n";\n// File I/O works\nfile_put_contents("output.txt", "Hello $name");\necho "File written!\\n";\n?>`,
    csharp:     `using System;\nusing System.IO;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n        string name = Console.ReadLine();\n        Console.WriteLine($"Hello, {name}!");\n        File.WriteAllText("output.txt", $"Hello {name}");\n        Console.WriteLine("File written!");\n    }\n}`,
    kotlin:     `import java.util.Scanner\nimport java.io.File\n\nfun main() {\n    val sc = Scanner(System.\`in\`)\n    println("Hello, World!")\n    val name = sc.nextLine()\n    println("Hello, $name!")\n    File("output.txt").writeText("Hello $name")\n    println("File written!")\n}`,
    swift:      `import Foundation\nlet name = readLine() ?? "World"\nprint("Hello, World!")\nprint("Hello, \\(name)!")`,
    bash:       `#!/bin/bash\necho "Hello, World!"\nread name\necho "Hello, $name!"\n# File I/O\necho "Hello $name" > output.txt\necho "File written!"`,
    perl:       `use strict;\nuse warnings;\nprint "Hello, World!\\n";\nmy $name = <STDIN>;\nchomp $name;\nprint "Hello, $name!\\n";\n# File I/O\nopen(my $fh, '>', 'output.txt') or die $!;\nprint $fh "Hello $name";\nclose $fh;\nprint "File written!\\n";`,
    lua:        `io.write("Hello, World!\\n")\nlocal name = io.read()\nio.write("Hello, " .. name .. "!\\n")\n-- File I/O\nlocal f = io.open("output.txt", "w")\nf:write("Hello " .. name)\nf:close()\nprint("File written!")`,
    r:          `cat("Hello, World!\\n")\nname <- readLines(con=stdin(), n=1)\ncat(paste("Hello,", name, "!\\n"))\n# File I/O\nwriteLines(paste("Hello", name), "output.txt")\ncat("File written!\\n")`,
    sql:        `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);\nINSERT INTO users VALUES (1, 'Alice', 30);\nINSERT INTO users VALUES (2, 'Bob', 25);\nINSERT INTO users VALUES (3, 'Charlie', 35);\nSELECT * FROM users;\nSELECT name FROM users WHERE age > 27 ORDER BY age DESC;`,
    haskell:    `main :: IO ()\nmain = do\n    putStrLn "Hello, World!"\n    name <- getLine\n    putStrLn $ "Hello, " ++ name ++ "!"`,
    scala:      `import scala.io.StdIn\nimport java.io._\n\nobject Main extends App {\n  println("Hello, World!")\n  val name = StdIn.readLine()\n  println(s"Hello, $name!")\n  val pw = new PrintWriter("output.txt")\n  pw.write(s"Hello $name")\n  pw.close()\n  println("File written!")\n}`,
    fsharp:     `open System\nopen System.IO\nlet name = Console.ReadLine()\nprintfn "Hello, World!"\nprintfn "Hello, %s!" name\nFile.WriteAllText("output.txt", sprintf "Hello %s" name)\nprintfn "File written!"`,
    elixir:     `IO.puts "Hello, World!"\nname = IO.gets("") |> String.trim()\nIO.puts "Hello, #{name}!"\nFile.write!("output.txt", "Hello #{name}")\nIO.puts "File written!"`,
    erlang:     `-module(main).\n-export([start/0]).\nstart() ->\n    io:format("Hello, World!~n"),\n    {ok, [Name]} = io:fread("", "~s"),\n    io:format("Hello, ~s!~n", [Name]).`,
    groovy:     `println "Hello, World!"\ndef name = System.in.newReader().readLine()\nprintln "Hello, $name!"\nnew File("output.txt").text = "Hello $name"\nprintln "File written!"`,
    cobol:      `       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HELLO.\n       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n       01 NAME PIC X(50).\n       PROCEDURE DIVISION.\n           DISPLAY "Hello, World!".\n           ACCEPT NAME.\n           DISPLAY "Hello, " NAME "!".\n           STOP RUN.`,
  },

  fibonacci: {
    python3:    `def fibonacci(n):\n    a, b = 0, 1\n    result = []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result\n\nn = int(input("How many terms? "))\nprint("Fibonacci:", *fibonacci(n))`,
    javascript: `function fibonacci(n) {\n  let [a, b] = [0, 1], result = [];\n  for (let i = 0; i < n; i++) {\n    result.push(a);\n    [a, b] = [b, a + b];\n  }\n  return result;\n}\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nrl.on('line', n => {\n  console.log('Fibonacci:', fibonacci(parseInt(n)).join(' '));\n  rl.close();\n});`,
    cpp:        `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<long long> fib;\n    long long a=0,b=1;\n    for(int i=0;i<n;i++){fib.push_back(a);long long c=a+b;a=b;b=c;}\n    cout << "Fibonacci: ";\n    for(auto x:fib) cout<<x<<" ";\n    cout<<endl;\n    return 0;\n}`,
    java:       `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long a=0,b=1;\n        System.out.print("Fibonacci: ");\n        for(int i=0;i<n;i++){System.out.print(a+" ");long c=a+b;a=b;b=c;}\n        System.out.println();\n    }\n}`,
    rust:       `use std::io;\nfn main() {\n    let mut s = String::new();\n    io::stdin().read_line(&mut s).unwrap();\n    let n:u64 = s.trim().parse().unwrap();\n    let (mut a,mut b)=(0u64,1u64);\n    print!("Fibonacci: ");\n    for _ in 0..n {print!("{} ",a);let c=a+b;a=b;b=c;}\n    println!();\n}`,
    go:         `package main\nimport "fmt"\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    a,b:=0,1\n    fmt.Print("Fibonacci: ")\n    for i:=0;i<n;i++{fmt.Printf("%d ",a);a,b=b,a+b}\n    fmt.Println()\n}`,
  },

  fileio: {
    python3:    `import os\n\n# ✅ Full File I/O — works on your machine!\nfilename = "codeforge_test.txt"\n\n# Write\nwith open(filename, "w") as f:\n    for i in range(1, 6):\n        f.write(f"Line {i}: Hello from CodeForge!\\n")\nprint(f"✅ Written to {filename}")\n\n# Read\nprint("\\n📄 File contents:")\nwith open(filename, "r") as f:\n    print(f.read())\n\n# Append\nwith open(filename, "a") as f:\n    f.write("\\nAppended line!")\nprint("✅ Appended to file")\n\n# File info\nprint(f"📦 File size: {os.path.getsize(filename)} bytes")\n\n# Cleanup\nos.remove(filename)\nprint("🗑 File deleted")`,
    javascript: `const fs = require('fs');\nconst path = require('path');\n\n// ✅ Full File I/O!\nconst filename = 'codeforge_test.txt';\n\n// Write\nfs.writeFileSync(filename, Array.from({length:5},(_,i)=>\`Line \${i+1}: Hello from CodeForge!\\n\`).join(''));\nconsole.log(\`✅ Written to \${filename}\`);\n\n// Read\nconsole.log("\\n📄 File contents:");\nconsole.log(fs.readFileSync(filename, 'utf8'));\n\n// Append\nfs.appendFileSync(filename, '\\nAppended line!');\nconsole.log("✅ Appended");\n\n// File info\nconst stats = fs.statSync(filename);\nconsole.log(\`📦 File size: \${stats.size} bytes\`);\n\n// Cleanup\nfs.unlinkSync(filename);\nconsole.log("🗑 File deleted");`,
    cpp:        `#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string fname = "codeforge_test.txt";\n    // Write\n    ofstream out(fname);\n    for(int i=1;i<=5;i++)\n        out << "Line " << i << ": Hello from CodeForge!\\n";\n    out.close();\n    cout << "✅ Written to " << fname << endl;\n    // Read\n    cout << "\\n📄 File contents:" << endl;\n    ifstream in(fname);\n    string line;\n    while(getline(in,line)) cout << line << endl;\n    in.close();\n    // Delete\n    remove(fname.c_str());\n    cout << "🗑 File deleted" << endl;\n    return 0;\n}`,
    python3_pip:`import subprocess\nimport sys\n\n# ✅ Install packages at runtime!\nprint("Installing requests package...")\nsubprocess.check_call([sys.executable, "-m", "pip", "install", "requests", "-q"])\n\nimport requests\nprint("✅ requests installed and imported!")\n\n# Make a real HTTP request\nprint("\\n🌐 Making HTTP request...")\nresponse = requests.get("https://httpbin.org/json")\nprint(f"Status: {response.status_code}")\nprint(f"Response: {response.json()}")`,
  },

  network: {
    python3:    `import urllib.request\nimport json\n\n# ✅ Network requests work!\nprint("🌐 Making HTTP request to public API...")\ntry:\n    url = "https://httpbin.org/json"\n    with urllib.request.urlopen(url, timeout=10) as response:\n        data = json.loads(response.read())\n    print("✅ Success!")\n    print(json.dumps(data, indent=2))\nexcept Exception as e:\n    print(f"❌ Error: {e}")`,
    javascript: `const https = require('https');\n\n// ✅ Network requests work!\nconsole.log("🌐 Making HTTP request...");\nhttps.get('https://httpbin.org/json', (res) => {\n  let data = '';\n  res.on('data', chunk => data += chunk);\n  res.on('end', () => {\n    console.log("✅ Success!");\n    console.log(JSON.parse(data));\n  });\n}).on('error', e => console.error('Error:', e.message));`,
    go:         `package main\nimport (\n    "fmt"\n    "io"\n    "net/http"\n)\nfunc main() {\n    fmt.Println("🌐 Making HTTP request...")\n    resp, err := http.Get("https://httpbin.org/json")\n    if err != nil { fmt.Println("Error:", err); return }\n    defer resp.Body.Close()\n    body, _ := io.ReadAll(resp.Body)\n    fmt.Println("✅ Status:", resp.Status)\n    fmt.Println(string(body))\n}`,
  },
};

const SNIP_STDIN = {
  hello:     'World',
  fibonacci: '10',
  fileio:    '',
  network:   '',
};

function getCode(lang, key) {
  const g = SNIPPETS[key];
  if (!g) return null;
  return g[lang] || g['python3'] || null;
}
