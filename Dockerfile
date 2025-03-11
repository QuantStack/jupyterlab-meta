FROM mambaorg/micromamba:2.0.5

COPY --chown=$MAMBA_USER:$MAMBA_USER environment.yaml /tmp/environment.yaml
RUN micromamba install -y -n base -f /tmp/environment.yaml && \
    micromamba clean --all --yes

WORKDIR /home/$MAMBA_USER/app

COPY --chown=$MAMBA_USER:$MAMBA_USER ./jupyter_server_test_config.py /home/$MAMBA_USER/app
RUN mkdir -p notebooks

ENTRYPOINT [ "/usr/local/bin/_entrypoint.sh", "jupyter", "lab", "--config", "jupyter_server_test_config.py" ]