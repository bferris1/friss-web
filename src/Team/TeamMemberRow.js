import React from 'react';

export const TeamMemberRow = (props)=>{
        return (
            <tr>
                <td>{props.member.profile.firstName} {props.member.profile.lastName}</td>
                <td>{props.member.email}</td>
                <td>
                    <input type='checkbox' name="scouter"
                           checked={props.member.scouter}
                           onChange={props.onChange}
                    />
                </td>
                <td>
                    <input type='checkbox' name="dataAnalyzer"
                           checked={props.member.dataAnalyzer}
                           onChange={props.onChange}
                    />
                </td>
                <td><button type='button' className='btn btn-danger' onClick={props.onDelete}>Remove</button></td>
            </tr>
        )
};
