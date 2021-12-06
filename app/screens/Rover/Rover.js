import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const roverSchema = Yup.object().shape({
    code: Yup.string()
        .min(3, 'Too Short!')
        .max(7, 'Too Long!')
        .required('Required'),
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    // TODO add a field with the name of the rover
})

const Rover = ({ navigation }) => {
    const [error, setError] = useState('');
    const handlerSubmit = async values => {
        console.log('submit');
        try {
            setError('');
            let rovers = [];
            const value = await AsyncStorage.getItem('rovers');
            if (value) {
                console.log(values.code);
                rovers = JSON.parse(value);
                if (
                    rovers.find(
                        item =>
                          item.code.trim().toUpperCase() === values.code.trim().toUpperCase(),
                      )
                ) {
                    return setError('This value is already present');
                    //TODO when adding the different rovers this needs to change to check code and rover
                }else {
                    rovers.push({...values, code: values.code.trim().toUpperCase()});
                    const json_value = JSON.stringify(rovers);
                    await AsyncStorage.setItem('rovers', json_value);
                  }
            } else {
                rovers.push(values);
                const json_value = JSON.stringify(rovers);
                await AsyncStorage.setItem('rovers', json_value);

            }
            navigation.navigate('Home')
        } catch (err) {
            AsyncStorage.removeItem('rovers');
            console.log(err)
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Formik
                    validationSchema={roverSchema}
                    initialValues={{ code: '', name: '' }}
                    onSubmit={values => handlerSubmit(values)}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched
                    }) => (
                        <>
                            {error ? (
                                <View style={[styles.form_group, styles.form_message_error]}>
                                    <Text style={styles.form_message_error_text}>{error}</Text>
                                </View>
                            ) : null}
                            <View style={styles.form_group}>
                                <Text style={styles.form_text}>Code</Text>
                                <TextInput
                                    onChangeText={handleChange('code')}
                                    onBlur={handleBlur('code')}
                                    style={styles.form_input}

                                    value={values.code}
                                />
                                {errors.code && touched.code ? (
                                    <Text style={styles.error}>{errors.code}</Text>
                                ) : null}
                            </View>
                            <View style={styles.form_group}>
                                <Text style={styles.form_text}>Name</Text>
                                {/* TODO change this to a select of differents rovers */}
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    style={styles.form_input}
                                    value={values.name}
                                />
                                {errors.name && touched.name ? (
                                    <Text style={styles.error}>{errors.name}</Text>
                                ) : null}
                            </View>
                            <View style={styles.form_group}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    activeOpacity={0.7}
                                    style={styles.btn}
                                >
                                    <Text style={styles.btn_text}>Add Rover</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}
export default Rover;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        paddingHorizontal: 15
    },
    form_group: {
        marginTop: 30
    },
    form_text: {
        fontWeight: 'bold',
    },
    form_input: {
        backgroundColor: '#e3e3e3',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    form_message_error: {
        backgroundColor: '#ffd6d6',
        borderColor: '#8d0000',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 5,
    },
    form_message_error_text: {
        color: '#8d0000'
    },
    error: {
        color: '#850000',
        fontSize: 13,
    },
    btn: {
        height: 50,
        display: 'flex',
        marginBottom: 50,
        borderRadius: 10,
        backgroundColor: '#142950',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.5,
        elevation: 5,

    },
    btn_text: {
        fontSize: 15,
        color: '#FFF',
        fontWeight: 'bold',
    },
});