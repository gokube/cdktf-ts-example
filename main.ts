import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { Image } from "./.gen/providers/docker/image"
import { Container } from "./.gen/providers/docker/container"
import { DockerProvider } from "./.gen/providers/docker/provider"

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new DockerProvider(this, "docker", {});
    const image=new Image(this,'nginxImag',{
      name:'nginx:latest',
      keepLocally:false,
    })

    new Container(this,'nginxContainer',{
      image:image.latest,
      name: 'cdktf_nginx',
      ports: [
        {
          internal: 80,
          external: 8000,
        },
      ],
    })
  }
}

const app = new App();
new MyStack(app, "typescript-docker");
app.synth();
