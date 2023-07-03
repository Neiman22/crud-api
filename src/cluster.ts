import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

if(cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)
} else {
   
}