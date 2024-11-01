import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!ingredient) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busque receitas por ingrediente</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite um ingrediente (ex: chicken)"
        value={ingredient}
        onChangeText={setIngredient}
      />
      <Button title="Buscar Receitas" onPress={fetchRecipes} />
      
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.recipeContainer}>
              <Text style={styles.recipeTitle}>{item.strMeal}</Text>
              {item.strMealThumb ? (
                <Image source={{ uri: item.strMealThumb }} style={styles.recipeImage} />
              ) : (
                <Text>Imagem não disponível</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f3f3f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
  recipeContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeImage: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
});
