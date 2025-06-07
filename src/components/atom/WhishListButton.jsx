"use client";

const { api, ENDPOINT } = require("@/lib/api");
const { LoaderPinwheel, PlusIcon } = require("lucide-react");
const { useSelector } = require("react-redux");




const WishListButton = ({wishlist}) => {
    const user= useSelector((state) => state.user);

    if(!user.isLoggedIn) {
        return <></>;
    }
    
    const addToWishList = async () => {
        try{
            setLoading(true);
            const res= await api.post(ENDPOINT.addToWishlist, wishlist);
            if(res.status == 200) {
                
            }
        }
        catch (err) {
            
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Button 
        data-testid="watchlist"
        className={`sm:ml-auto ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={addToWishList}>
            {loading ? <LoaderPinwheel data-testid="loading-icon" className="w-4 h-4 mr-2" /> : <PlusIcon className="w-4 h-4 mr-2" />}
            Watchlist
        </Button>
    )
}


export default WishListButton