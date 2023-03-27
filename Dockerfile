FROM registry.cn-heyuan.aliyuncs.com/mierku_blog/mynode
ARG URL
ARG APP_URL
ENV NUXT_PUBLIC_BASE_URL=${URL}
ENV NUXT_APP_BASE_URL=${APP_URL}
WORKDIR /nuxt 
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
RUN pnpm i -shamefully-hoist
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"] 
