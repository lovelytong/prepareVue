import axios from 'axios';
import Message from 'element-ui'

export default {
  get: async function (url) {

    let response;
    response = await axios({
      method: 'get',
      url,
      baseURL:'http://localhost:8081',
      mode: "cors",
    });
    // if (!response.success){
    //   Message.error(response.date.msg)
    // }
    return response.data
  },
  post: async function (url,param) {
    let response = await axios({
      method: 'post',
      baseURL:'http://localhost:8081',
      url,
      data: param
    })

    if (!response.success){
      Message.error(response.date.msg)
    }

    return response.data
  }
}
