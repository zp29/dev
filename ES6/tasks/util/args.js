// 处理命令行

import yargs from 'yargs';
// 引入模块

const args = yargs


  .option('watch',{
    boolean: true,
    default: false,
    describe:'watch all files'
  })

  // .option('port',{
  //   string: true,
  //   default: 8080,
  //   describe: 'server prot'
  // })

  .argv


export default args;