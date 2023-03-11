import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProfile, updateProfile } from "./profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.myProfile?.profile);
  const status = useSelector((state) => state.myProfile?.status);
  const error = useSelector((state) => state.myProfile?.error);

  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile());
    }
  }, [status, dispatch]);
  console.log("myProfile ---->", profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = { bio, skills };
    dispatch(updateProfile(profile));
    setBio("");
    setSkills("");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  if (status === "succeeded") {
    return (
      <div>
        <div>
          <img src={profile.imageURL} height="300" width="330" />
          <h2>{profile.username}</h2>
          <p>{profile.email}</p>
          <p>{profile.bio}</p>
          <p>{profile.skills}</p>
        </div>

        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="bio">
                <small>Bio</small>
              </label>
              <input
                name="bio"
                type="text"
                required
                defaultValue={profile?.bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="skills">
                <small>Skills</small>
              </label>
              <input
                name="skills"
                type="text"
                required
                defaultValue={profile?.skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Update</button>
            </div>
            {error && <div> {error} </div>}
          </form>
        </div>
      </div>
    );
  }
};

export default Profile;
