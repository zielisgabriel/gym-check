import { Environment } from "vitest"

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup(){
    console.log('Setup console')

    return{
      teardown(){
        console.log('Teardown')
      }
    }
  }
}





// import { Environment } from "vitest/environments";

// console.log('Custom environment loaded');

// export default {
//     name: 'prisma',
//     transformMode: 'ssr',
//     async setup() {
//       console.error('Hello from setup');
      
//       return {
//         async teardown() {
//           console.error('Teardown from prisma environment');
//         }
//       };
//     }
//   } as Environment;