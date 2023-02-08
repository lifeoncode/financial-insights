<h1>FINANCIAL INSIGHTS</h1>
<p>This application allows users to visualize their finances to (hopefully) get a better understanding of their income and expenditure.</p>

<h3>How it works</h3>
<p>As a user, you enter details such as your name, surname and date of birth. Then you need to upload an excel spreadsheet file containing income and expenses information for a given numbe of months.<br>The application reads this information and gives you a visual representation of it in the form of an interactive graph.</p>

<h3>How to run on local machine</h3>
<p>If you prefer to use this application with the source code (i.e run it from your local machine), the steps below outline how you can do exactly that.</p>
<p><strong><em>NOTE: There's a few things you'll need to have installed on your computer to run the application:</em></strong></p>
<ul>
<li><strong>Node.Js</strong> (this app is built in Javascript, you'll need Node.js to run the server on your computer)</li>
<li><strong>Text editor</strong> (this is not required, but if you're gonna dive in the source code, then you'll need some sort of text editor/IDE such as VScode)</li>
<li><strong>Command line or Terminal</strong> (you'll need this to execute script files and install dependencies, the great thing about having an IDE/text editor is that it has an in-built terminal)</li>
<li><strong>Web browser</strong> (when you run the application, you'll need to open a web browser, make sure you have one installed)</li>
</ul>

<h4>Here are links to install any/all of the above if you don't have them on your computer</h4>
<ul>
<li>Node.Js: <a href="https://nodejs.org/">Download link</a></li>
<li>VScode: <a href="https://code.visualstudio.com/">Download link</a></li>
<li>Git: <a href="https://git-scm.com/">Download link</a></li>
<li>Web browser: <a href="https://www.google.com/chrome/">Download link</a></li>
</ul>

<h4>Steps:</h4>
<ol>
<li>Clone or Download the repository (to clone, open your terminal/command line and run <code>git clone https://github.com/lifeoncode/financial-insights</code>) (for downloading you can click the "code" green button on this repository and click "download zip")</li>
<li>If you downloaded the zip file, find it from you Downloads folder and unzip it (this only applies if you choose to download instead of clone)</li>
<li>At this point you should have a folder named <strong><em>financial-insights</em></strong> somewhere on your computer (depending on where you cloned/unzipped from)</li>
<li>Open your Terminal/Command line and run <code>cd financial-insights</code> or find the folder and right click then select "open in terminal"</li>
<li>From you terminal, run <code>npm install</code> if you get "permission denied" error, run <code>sudo npm install</code> (this will install all dependencies the application needs in order to run properly)</li>
<li>After dependencies finish installing, run <code>nodemon index.js</code></li>
<li>You should see "server running: http://localhost:5000" on your terminal/command line</li>
<li>Open a web browser and navidate to <code>http://localhost:5000</code></li>
<li>You can use the "sample.xlsx" file that comes with the repository to test how the application works and for referencing how your own file should be structured</li>
</ol>
