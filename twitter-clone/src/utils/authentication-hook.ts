import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authenticatedUserAtom, Error404Atom, ErrorAtom } from "../recoil/atom";

export function useAuth () {
    const setAuthenticatedUser = useSetRecoilState(authenticatedUserAtom)
    const setIsError = useSetRecoilState(ErrorAtom);
    const setIsError404 = useSetRecoilState(Error404Atom);

    async function checkAuth(id: string, password: string) {
        try {
          const res = await axios.get('http://localhost:3001/users/' + id);
          const user = res.data;
          if (user && user.password === password) {
            setAuthenticatedUser({
              isAuthenticated: true,
              user: user
            })
          }
          else {
            setIsError404(true);
            setTimeout(() => {
              setIsError404(false);
            }, 3000);
          }
        }
        catch (error: any) {
          if (error.response.status === 404) {
            setIsError404(true);
            // error 404 inform about invalid password/username. 
            // The msg is shown under the inputs, there's no redirects for invalid password/username
            // setTimeout is for disappearing that msg after some time
            setTimeout(() => {
              setIsError404(false);
            }, 3000);
          }
          else {
            setIsError(true);
            setTimeout(() => {
              setIsError(false);
            }, 3000);
          }
        }
      }

      return {checkAuth};
    }