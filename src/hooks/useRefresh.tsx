import useAuthStore from "../store/useAuth"


const useRefresh = () => {
    const {refreshToken} = useAuthStore(state => state)

    
  return (
    <div>useRefresh</div>
  )
}

export default useRefresh