FROM node:6.9.0
RUN apt-get update -y
RUN apt-get install apt-transport-https -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.24.2