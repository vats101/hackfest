import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../community/navbar-comm";
import Post from "../community/Post";
import db from "../lib/firebase";
import '../community/comm.css'

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    db.collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
        setLoading(false);
        console.log(posts)
      });
  }, []);

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _posts = [];

        querySnapshot.forEach((doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPosts(_posts);
      });
  }, []);

  if (isLoading) {
    return (
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxW="md" centerContent p={8}>
        <VStack spacing={8} className="post-list" w="100%">
          {posts.map((post) => (
            <Post post={post} key={post.id} posts={posts} />
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default Community;