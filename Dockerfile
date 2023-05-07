FROM nginx:1
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm 50x.html && curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && apt-get install -y nodejs
COPY . design-system
RUN cd design-system && npm install && npm run build && mv node_modules/bootstrap-icons/font/fonts web && cd .. && mv design-system/web/* . && rm -r design-system && apt-get purge -y nodejs && rm /etc/apt/sources.list.d/nodesource.list