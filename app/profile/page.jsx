import EmailIcon from "@/components/icons/EmailIcon"
import RoleIcon from "@/components/icons/RoleIcon"
import UserIcon from "@/components/icons/UserIcon"
import { Session } from "@/components/Session"

export default async function Page() {
    const user = await Session()
    
    return (
        <div className="center">
            {
                user ? (
                    <div className="cart flex" style={{flexDirection: "column"}}>
                        <div className="shape"></div>
                        <UserIcon className="icon-person"/>
                        <div className="profile">
                            <h1>{user.name}</h1>
                            <ul>
                                <li className="list-profile">
                                    <div className="pro-div pro-text">
                                        {user.email}
                                    </div>
                                    <div className="pro-div pro-icon">
                                        <EmailIcon className="border-right"/>
                                    </div>
                                </li>
                                <li className="list-profile">
                                    <div className="pro-div pro-text">
                                        {(user.role) == "user" ? "کاربر عادی" : "ادمین"}
                                    </div>
                                    <div className="pro-div pro-icon">
                                        <RoleIcon className="border-right"/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) :
                <div className="center" style={{marginBottom: "30px"}}>ابتدا وارد حساب خود شوید</div>
            }
        </div>
    )
}