"use client"
import { useRouter } from "next/navigation"
import ChangeRoleUser from "./ChangeRoleUser"

export default function UsersData({users}) {
    const router = useRouter()
    const dataUsers = users

    const refreshHandler = (value) => {
        if (value) {
            router.refresh()
        }
    }

    return (
        <div>
            <div>
                <h1 className="center">کاربران</h1>
                <div className="over">
                    {
                        dataUsers.length > 0 ? (
                            <table className="ad-table">
                                <thead>
                                    <tr>
                                        <td>
                                            <strong>نام کاربری</strong>
                                        </td>
                                        
                                        <td>
                                            <strong>ایمیل</strong>
                                        </td>

                                        <td>
                                            <strong>نقش</strong>
                                        </td>

                                        <td>
                                            <strong>عملیات</strong>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataUsers.map(
                                            (user) => (
                                                <tr key={user._id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>

                                                    <td>
                                                        <div className="flex">
                                                            <ChangeRoleUser user={user} refreshHandler={refreshHandler}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        ) : <div className="center">هیچ کاربری یافت نشد</div> 
                    }

                </div>
            </div>
        </div>
    )
}