FROM node:6 AS builder

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get --assume-yes install --no-install-recommends \
        build-essential \
	redis-server && \
    npm install -g grunt && \
    npm install -g bower

COPY . /home/onz/onz-explorer/
RUN useradd onz && \
    chown onz:onz -R /home/onz
USER onz
RUN cd /home/onz/onz-explorer && \
    npm install
RUN cd /home/onz/onz-explorer && \
    npm run build


FROM node:6-alpine

RUN adduser -D onz 
COPY --chown=onz:onz --from=builder /home/onz/onz-explorer /home/onz/onz-explorer
COPY --chown=onz:onz config.docker.js /home/onz/onz-explorer/config.js

USER onz
WORKDIR /home/onz/onz-explorer
CMD ["node", "app.js"]
