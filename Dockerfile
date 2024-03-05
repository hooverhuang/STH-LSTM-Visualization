FROM python:3.10.12

LABEL MAINTAINER=yanjhen version="0" description="demo for sea_project"

WORKDIR /yanjhen_newweb

ADD . /yanjhen_newweb

RUN pip install -r requirements.txt

RUN ["/bin/bash", "-c", "echo $HOME" ]

CMD python3 back.py