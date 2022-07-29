import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { database } from '../config/fb'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Product from '../components/Product'

const Home = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableOpacity title='Add' onPress={() => navigation.navigate('Add')}><Text style={{fontWeight: 'bold'}}> ➕ Add</Text></TouchableOpacity>
        })
    }, [])

    useEffect(() => {
        const collectionRef = collection(database, 'products');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsuscribe = onSnapshot(q, querySnapshot => {
            setProducts(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    emoji: doc.data().emoji,
                    name: doc.data().name,
                    price: doc.data().price,
                    isSold: doc.data().isSold,
                    createdAt: doc.data().createdAt,
                }))
            )
        });

        return unsuscribe;
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products</Text>
            {products.map(product => <Product key={product.id} {...product} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3F9'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 16
    }
})

export default Home