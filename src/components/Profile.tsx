"use client"
import { useState } from "react";
import { User, Lock } from "lucide-react";

const Profile = () => {

  const tabs = [
    {label: 'Мэдээлэл засах', icon:<User className="w-5 h-5 mr-2"/>},
    {label: 'Нууц үг солих', icon:<Lock className="w-5 h-5 mr-2"/>}
  ]
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      
      {/* Tab selection */}
      <div className="flex">
        {tabs.map((tab, index) =>(
          <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`h-20 w-44 mr-6 p-4 flex items-center bg-white rounded shadow-sm ${
            activeTab === index
              ? 'border-rose-500 text-rose-500'
              : 'border-transparent text-gray-500 hover:text-rose-400'
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-w-screen mt-4 p-4 bg-white rounded shadow-sm ">
        {activeTab === 0 && (
          <div className="">
            
            <form action="" className="space-y-4">
              <div>
                <label className="">Овог</label>
                <input type="text" className="form-input" placeholder="Овог"/>
              </div>
              <div>
                <label className="">Нэр</label>
                <input type="text" className="form-input" placeholder="Нэр"/>
              </div>
              <div>
                <label className="">Имэйл</label>
                <input type="email" className="form-input" placeholder="Имэйл"/>
              </div>
              <div>
                <button className="form-button">Хадгалах</button>
              </div>
            </form>
  
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <form action="" className="space-y-4">
              <div>
                <label className="">Хуучин нууц үг</label>
                <input type="email" className="form-input" placeholder=""/>
              </div>
              <div>
                <label className="">Шинэ нууц үг</label>
                <input type="email" className="form-input" placeholder=""/>
              </div>
              <div>
                <label className="">Шинэ нууц үг баталгаажуулах</label>
                <input type="email" className="form-input" placeholder=""/>
              </div>
              <div>
                <button className="form-button">Хадгалах</button>
              </div>
            </form>
          </div>
        )}
      </div>

    </div>
  )
}

export default Profile;