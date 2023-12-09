FROM node:21-bookworm-slim
RUN mkdir /app
COPY .yarn package*.json yarn.lock /app/
WORKDIR /app
RUN yarn install --immutable
COPY . /app
RUN yarn build
CMD ["yarn", "start"]