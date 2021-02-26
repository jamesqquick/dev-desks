import React, { useState } from 'react';
import useProfile from '../hooks/UseProfile';
import UserImageUpload from './UserImageUpload';
import { useAlert } from 'react-alert';
import FormInput from './FormInput';
import { useForm } from 'react-hook-form';

export default function EditProfile({ profile }) {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            usesLink: profile.usesLink,
            githubUsername: profile.githubUsername,
            twitterUsername: profile.twitterUsername,
            description: profile.description,
        },
    });
    const { refreshProfile, updateProfile } = useProfile();
    const alert = useAlert();

    const handleUpdateProfile = async (data) => {
        try {
            await updateProfile(data);
            refreshProfile();
            alert.show('Profile updated successfully', {
                type: 'success',
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-screen-md mx-auto">
            <UserImageUpload existingImageId={profile.imgId} />
            <h1 className="text-4xl my-4 text-center">{profile.name}</h1>
            <form className="mt-4" onSubmit={handleSubmit(handleUpdateProfile)}>
                <FormInput
                    name="twitterUsername"
                    label="Twitter handle"
                    register={register}
                />
                <FormInput
                    name="githubUsername"
                    label="Github username"
                    register={register}
                />
                <FormInput
                    name="usesLink"
                    label="Uses page"
                    register={register}
                />

                <button
                    type="submit"
                    className="inline-block text-sm px-4 py-2 rounded bg-accent-green-400 text-white hover:bg-accent-green-500 disabled:opacity-50"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
