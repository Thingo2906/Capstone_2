import React, {useState, useContext} from "react";
import UserContext from "../../auth/UserContext";
//import "./Profile.css";
import Alert from "../../support/Alert";

// Fill out the form to update user info.
function ProfileForm({changeProfile}){
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({username: currentUser.username, password: "", email: currentUser.email});
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    console.debug(
       "ProfileForm",
       "currentUser=",
       currentUser,
       "formData=",
       formData,
       "formErrors=",
       formErrors,
       "saveConfirmed=",
       saveConfirmed
     );

    function handleChange(evt){
        const {value, name} = evt.target;
        setFormData(f => ({...f, [name]: value}));
        setFormErrors([])
    }

    async function handleSubmit(evt){
      evt.preventDefault();
      let updatedUser;
      try {
        updatedUser = await changeProfile(currentUser.username, formData);
      } catch (errors) {
        setFormErrors(errors);
        return;
      }
      // Empty the password. and the user need to fill out password to confirm the change.
      setFormData((formData) => ({ ...formData, password: "" }));
      setCurrentUser(updatedUser);
      setFormErrors([]);
      setSaveConfirmed(true);
    }

    return (
         <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
       <h2>Profile</h2>
       <div className="card">
         <div className="card-body">
           <form onSubmit={handleSubmit}>
             <div className="form-group">
               <label><b>Username</b></label>
               <p className="form-control-plaintext">{currentUser.username}</p>
             </div>
             <div className="form-group">
               <label>Email</label>
               <input
                 name="email"
                 className="form-control"
                 onChange={handleChange}
                 value={currentUser.email}
               />
             </div>
             <div className="form-group">
               <h3>Confirm your password to update your change</h3>

               <label>Password</label>
               <input
                 type="password"
                 name="password"
                 className="form-control"
                 onChange={handleChange}
                 value={currentUser.password}
               />
             </div>

             {formErrors.length ? (
               <Alert type="danger" messages={formErrors} />
             ) : null}

             {saveConfirmed ? (
               <Alert type="success" messages={["Updated successfully."]} />
             ) : null}

             <button
               className="btn btn-primary btn-block mt-4"
               onSubmit={handleSubmit}
             >
               Save
             </button>
           </form>
         </div>
       </div>
     </div>
   );

}
export default ProfileForm;

