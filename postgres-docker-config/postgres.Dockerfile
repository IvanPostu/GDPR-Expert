FROM postgres:11
COPY ./init-scripts/* /docker-entrypoint-initdb.d/

RUN useradd --create-home -g users ivan

WORKDIR /home/ivan/scripts

