FROM ubuntu:16.04

COPY ./build/sources.list /etc/apt/sources.list

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4\
&& echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list\
&& apt-get update\
&& apt-get install -y curl\
&& curl -sL https://deb.nodesource.com/setup_10.x | bash  - \
&& apt-get install -y nodejs\
&& apt-get install -y mongodb-org

CMD ["/bin/bash","-c","cd /root/platform/ && npm install nodemon -g && nodemon app.js"]

