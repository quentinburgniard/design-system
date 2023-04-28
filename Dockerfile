FROM nginx:1
COPY web /usr/share/nginx/html
RUN rm /usr/share/nginx/html/50x.html
RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && apt-get install -y nodejs
COPY . /usr/share/nginx/html/design-system
RUN cd /usr/share/nginx/html/design-system && npm install && npm run build && mv web/* /usr/share/nginx/html && rm -dr /usr/share/nginx/html/design-system && apt-get purge -y nodejs && rm -r /etc/apt/sources.list.d/nodesource.list