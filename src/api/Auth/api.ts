import { SIGININ_DOMAIN, http_methods } from '../constants';

export const SignIn = async (data: {email: string, password: string}) => {

    try {
        const response = await fetch(SIGININ_DOMAIN,
            {
              method: http_methods.post,
              headers: {
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
              },
              body: JSON.stringify({
                email: data.email,
                password: data.password
              })
            },
          );
  
        return response
        
    } catch (error) {

      if(error){
        console.log(error)
      }
        
    }
}