#!/bin/bash

# Example: 
# /home/ivan/.config/Code/User/workspaceStorage/8921d319a5f86ad60eb384bb83d5c7d9/adashen.vscode-tomcat/tomcat/apache-tomcat-9.0.38/webapps/gdpr-expert-web/WEB-INF/views
filenameArgument=$1

if [ "$filenameArgument" = "" ]
then 
	echo "One argument is required!!!"
  exit 1
fi

projectPath="/home/ivan/PROJECTS/GDPR-Expert/gdpr-expert-web"
distPath=$1

linkViews () {
  projectViews="$projectPath/src/main/webapp/WEB-INF/views"
  distViews="$distPath/views"


  cd $distViews

  for f in `find ./ -type f`; do
    rm $f
  done


  cd $projectViews

  for f in `find ./ -type f`; do
    f="${f:2}"
    ln "./$f" "$distViews/$f"

  done


} 

linkStaticFiles () {
  projectStaticFiles="$projectPath/src/main/webapp/WEB-INF/static"
  distStaticFiles="$distPath/static"


  cd $distStaticFiles

  for f in `find ./ -type f`; do
    rm $f
  done


  cd $projectStaticFiles

  for f in `find ./ -type f`; do
    f="${f:2}"
    ln "./$f" "$distStaticFiles/$f"

  done


} 



linkViews && linkStaticFiles


