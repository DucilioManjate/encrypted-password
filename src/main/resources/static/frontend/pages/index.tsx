import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  useToast,
  Toast,
} from "@chakra-ui/react";
import HeaderComponents from './components/header'
import api from "./api";

export default function Home() {
  const [id, setId] = useState(null);
  const [password, setPassword] = useState("");
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidFormData = () => {
    if (!password) {
      return Toast({
        title: "Preencha o campo nome!!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  const handleSubmitCreateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;
    try {
      setIsLoading(true);
      const { data } = await api.post("/passwords/api", { password });
      setClients(clients.concat(data.data));
     setPassword("");
      setIsFormOpen(!isFormOpen);
      Toast({
        title: "Cadastrado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleDeleteClient = async (_id) => {
    try {
      await api.delete(`/passwords/api/${id}`);
      Toast({
        title: "Deletado com sucesso!!",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlShowUpdateClient = (pass) => {
    setId(pass._id);
    setPassword(pass.password);
    setIsFormOpen(true);
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;

    try {
      setIsLoading(true);
      await api.put(`passwords/api/${id}`, { password});
      setPassword("");
      setId(null);
      setIsFormOpen(!isFormOpen);

      toast({
        title: "Atualizado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const toast = useToast();

  useEffect(() => {
    [
      api.get("/passwords/api").then(({ data }) => {
        setClients(data.data);
      }),
    ];
  }, [clients]);
  return (
    <div>

      {/* <HeaderComponents /> */}
      <Box>
      {/* <HeaderComponents /> */}
      <Flex align="center" justifyContent="center">
        <Box
          width={800}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          p={20}
          mt="25"
        >
          <Flex justifyContent="flex-end">
            <Button
              colorScheme="green"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              {isFormOpen ? "-" : "+"}
            </Button>
          </Flex>

          {isFormOpen ? (
            <VStack
              as="form"
              onSubmit={id ? handleUpdateClient : handleSubmitCreateClient}
            >
              {/* <FormControl>
                <FormLabel>Id</FormLabel>
                <Input
                  type="id"
                  placeholder="id"
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                />
              </FormControl> */}

              <FormControl mt={5}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="what is your password?"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FormControl>

              <Button
                colorScheme="green"
                type="submit"
                mt={6}
                isLoading={isLoading}
              >
                {id ? "Atualizar" : "Cadastrar"}
              </Button>
            </VStack>
          ) : null}

          <Table variant="simple" mt={6}>
            <Thead bgColor="teal.500">
              <Tr>
                <Th textColor="white">id</Th>
                <Th textColor="white">password</Th>
               
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client, index) => (
                <Tr key={index}>
                  <Td>id</Td>
                  <Td>password</Td>
                  <Td justifyContent="space-between">
                    <Flex>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="yellow"
                        mr="2"
                        onClick={() => handlShowUpdateClient(client)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="red"
                        mr="2"
                        onClick={() => handleDeleteClient(client._id)}
                      >
                        Remover
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>




    </div>
  )
}


