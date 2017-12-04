import React from 'react';

export const TeamMemberRow = (props)=>{
        return (
            <tr>
                <td>{props.member.profile.firstName} {props.member.profile.lastName}</td>
                <td>{props.member.email}</td>
                <td>
                    <input type='checkbox' name="canScout"
                           checked={props.member.canScout}
                           onChange={props.onChange}
                    />
                </td>
                <td>
                    <input type='checkbox' name="canAnalyze"
                           checked={props.member.canAnalyze}
                           onChange={props.onChange}
                    />
                </td>
                <td><button type='button' className='btn btn-danger' onClick={props.onDelete}>Remove</button></td>
            </tr>
        )
};
