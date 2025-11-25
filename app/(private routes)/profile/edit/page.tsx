"use client";
import React, { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { editUser, getUser } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { ApiError } from "@/types/apiError";
import { useRouter } from 'next/navigation';

const EditProf = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await getUser();
        setUser(me);
      } catch (error) {
            setError(
              (error as ApiError).response?.data?.error ??
                (error as ApiError).message ??
                'Oops... some error'
            )
          }
    };
    fetchUser()
  }, []);

  const handleSubmit = async (formData :FormData) => {
    try{
    const values = Object.fromEntries(formData) as {username: string};
    const pushUserName = await editUser(values)
    if(pushUserName){
      router.push('/profile');
    } else {
        setError('Invalid edit profile');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      )
    }
  }

  const handleCancel = () => {
    router.push('/profile');
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || "/default-avatar.svg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" type="text" className={css.input} defaultValue={user?.username ?? ''}/>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProf;
