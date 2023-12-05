import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

function AdminInfo() {
  const navigate = useNavigate();
  const [user, setUsers] = useState("");
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  useEffect(() => {

    const fetchAllUsersInfo = async () => {
      console.log(localStorage);
      try {
        const response = await axios.get('https://localhost:7213/ShortenerUrl/info', {
          headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`, 
          },
        });
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error('Error fetching users information');
        }
      } catch (error) {
        console.error('Error fetching users information:', error);
      }
    };

    if (isAdmin && token) {
      fetchAllUsersInfo();
    } else {
      navigate('/');
    }
  }, [token, isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      {user.length > 0 ? (
        <div>
          <p>Hello admin!</p>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Number Enter</TableCell>
              </TableRow>
            </TableHead> 
            <TableBody>
              {user.map((user, index) => (
                <TableRow key={index + 1}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.loginsCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>Loading users information...</p>
      )}

      <div className="logout-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AdminInfo;
