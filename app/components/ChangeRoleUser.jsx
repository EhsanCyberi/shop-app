import DwonIcon from "./icons/DownIcon"
import UpIcon from "./icons/UpIcon"

export default function ChangeRoleUser({user, refreshHandler}) {
    const userTarget = user
    
    const changeRole = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("https://shop-apps-omega.vercel.app/api/users", {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(userTarget),
                credentials: 'include',
            })
            const result = await res.json()
            if (res.ok) {
                refreshHandler(true)
            } else {
                console.log(result.error)
                alert("خطا در تغییر نقش کاربر")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button onClick={changeRole} className="btn-icon">
            {
                userTarget.role == "user" ? (
                    <div className="space">
                        <UpIcon/>
                        <span>ارتقا</span>
                    </div>
                )  : (
                    <div  className="space">
                        <DwonIcon/>
                        <span>تنزل</span>
                    </div>
                )
            }
        </button>
    )
}