import { createGlobalStyle } from 'styled-components';
import TodoTemplate from '../components/TodoTemplate';
import TodoHead from '../components/TodoHead';
import TodoList from '../components/TodoList';
import TodoCreate from '../components/TodoCreate';
import { TodoProvider } from '../TodoContext';
import { Kakao } from '../components/kakaologin';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function Home() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <Kakao/>
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default Home;