
import request from '../lib/requests'

export default {
  login: async(context) =>{

    let data = await request.get('')
    context.commit({
      type:"alert",
      data
    })
  }
}
