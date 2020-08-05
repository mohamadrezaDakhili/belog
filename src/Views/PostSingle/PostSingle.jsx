import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from "reactstrap";

function PostSingle() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const getData = () => {
    Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.warn(err));
    Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.warn(err));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <h2>{post.title}</h2>
        </CardHeader>
        <CardBody>
          <p>{post.body}</p>
        </CardBody>
        <CardFooter>{post.userId}</CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <h2>comments</h2>
        </CardHeader>
        <CardBody>
          <Row>
            {comments.map((comment) => (
              <Col xs={12} className="border p-3">
                <div>comment by:{comment.name}</div>
                <div>email:{comment.email}</div>
                <div>{comment.body}</div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default PostSingle;
