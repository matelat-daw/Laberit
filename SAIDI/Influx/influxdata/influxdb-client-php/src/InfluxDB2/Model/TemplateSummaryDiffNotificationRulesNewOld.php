<?php
/**
 * TemplateSummaryDiffNotificationRulesNewOld
 *
 * PHP version 5
 *
 * @category Class
 * @package  InfluxDB2
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 */

/**
 * InfluxDB OSS API Service
 *
 * The InfluxDB v2 API provides a programmatic interface for all interactions with InfluxDB. Access the InfluxDB API using the `/api/v2/` endpoint.
 *
 * OpenAPI spec version: 2.0.0
 * 
 * Generated by: https://openapi-generator.tech
 * OpenAPI Generator version: 3.3.4
 */

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

namespace InfluxDB2\Model;

use \ArrayAccess;
use \InfluxDB2\ObjectSerializer;

/**
 * TemplateSummaryDiffNotificationRulesNewOld Class Doc Comment
 *
 * @category Class
 * @package  InfluxDB2
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 */
class TemplateSummaryDiffNotificationRulesNewOld implements ModelInterface, ArrayAccess
{
    const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'TemplateSummary_Diff_notificationRules_new_old';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'name' => 'string',
        'description' => 'string',
        'endpoint_name' => 'string',
        'endpoint_id' => 'string',
        'endpoint_type' => 'string',
        'every' => 'string',
        'offset' => 'string',
        'message_template' => 'string',
        'status' => 'string',
        'status_rules' => '\InfluxDB2\Model\TemplateSummarySummaryStatusRules[]',
        'tag_rules' => '\InfluxDB2\Model\TemplateSummarySummaryTagRules[]'
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPIFormats = [
        'name' => null,
        'description' => null,
        'endpoint_name' => null,
        'endpoint_id' => null,
        'endpoint_type' => null,
        'every' => null,
        'offset' => null,
        'message_template' => null,
        'status' => null,
        'status_rules' => null,
        'tag_rules' => null
    ];

    /**
     * Array of property to type mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPITypes()
    {
        return self::$openAPITypes;
    }

    /**
     * Array of property to format mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPIFormats()
    {
        return self::$openAPIFormats;
    }

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @var string[]
     */
    protected static $attributeMap = [
        'name' => 'name',
        'description' => 'description',
        'endpoint_name' => 'endpointName',
        'endpoint_id' => 'endpointID',
        'endpoint_type' => 'endpointType',
        'every' => 'every',
        'offset' => 'offset',
        'message_template' => 'messageTemplate',
        'status' => 'status',
        'status_rules' => 'statusRules',
        'tag_rules' => 'tagRules'
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'name' => 'setName',
        'description' => 'setDescription',
        'endpoint_name' => 'setEndpointName',
        'endpoint_id' => 'setEndpointId',
        'endpoint_type' => 'setEndpointType',
        'every' => 'setEvery',
        'offset' => 'setOffset',
        'message_template' => 'setMessageTemplate',
        'status' => 'setStatus',
        'status_rules' => 'setStatusRules',
        'tag_rules' => 'setTagRules'
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'name' => 'getName',
        'description' => 'getDescription',
        'endpoint_name' => 'getEndpointName',
        'endpoint_id' => 'getEndpointId',
        'endpoint_type' => 'getEndpointType',
        'every' => 'getEvery',
        'offset' => 'getOffset',
        'message_template' => 'getMessageTemplate',
        'status' => 'getStatus',
        'status_rules' => 'getStatusRules',
        'tag_rules' => 'getTagRules'
    ];

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @return array
     */
    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @return array
     */
    public static function setters()
    {
        return self::$setters;
    }

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @return array
     */
    public static function getters()
    {
        return self::$getters;
    }

    /**
     * The original name of the model.
     *
     * @return string
     */
    public function getModelName()
    {
        return self::$openAPIModelName;
    }

    

    

    /**
     * Associative array for storing property values
     *
     * @var mixed[]
     */
    protected $container = [];

    /**
     * Constructor
     *
     * @param mixed[] $data Associated array of property values
     *                      initializing the model
     */
    public function __construct(array $data = null)
    {
        $this->container['name'] = isset($data['name']) ? $data['name'] : null;
        $this->container['description'] = isset($data['description']) ? $data['description'] : null;
        $this->container['endpoint_name'] = isset($data['endpoint_name']) ? $data['endpoint_name'] : null;
        $this->container['endpoint_id'] = isset($data['endpoint_id']) ? $data['endpoint_id'] : null;
        $this->container['endpoint_type'] = isset($data['endpoint_type']) ? $data['endpoint_type'] : null;
        $this->container['every'] = isset($data['every']) ? $data['every'] : null;
        $this->container['offset'] = isset($data['offset']) ? $data['offset'] : null;
        $this->container['message_template'] = isset($data['message_template']) ? $data['message_template'] : null;
        $this->container['status'] = isset($data['status']) ? $data['status'] : null;
        $this->container['status_rules'] = isset($data['status_rules']) ? $data['status_rules'] : null;
        $this->container['tag_rules'] = isset($data['tag_rules']) ? $data['tag_rules'] : null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        return $invalidProperties;
    }

    /**
     * Validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properties are valid
     */
    public function valid()
    {
        return count($this->listInvalidProperties()) === 0;
    }


    /**
     * Gets name
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->container['name'];
    }

    /**
     * Sets name
     *
     * @param string|null $name name
     *
     * @return $this
     */
    public function setName($name)
    {
        $this->container['name'] = $name;

        return $this;
    }

    /**
     * Gets description
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->container['description'];
    }

    /**
     * Sets description
     *
     * @param string|null $description description
     *
     * @return $this
     */
    public function setDescription($description)
    {
        $this->container['description'] = $description;

        return $this;
    }

    /**
     * Gets endpoint_name
     *
     * @return string|null
     */
    public function getEndpointName()
    {
        return $this->container['endpoint_name'];
    }

    /**
     * Sets endpoint_name
     *
     * @param string|null $endpoint_name endpoint_name
     *
     * @return $this
     */
    public function setEndpointName($endpoint_name)
    {
        $this->container['endpoint_name'] = $endpoint_name;

        return $this;
    }

    /**
     * Gets endpoint_id
     *
     * @return string|null
     */
    public function getEndpointId()
    {
        return $this->container['endpoint_id'];
    }

    /**
     * Sets endpoint_id
     *
     * @param string|null $endpoint_id endpoint_id
     *
     * @return $this
     */
    public function setEndpointId($endpoint_id)
    {
        $this->container['endpoint_id'] = $endpoint_id;

        return $this;
    }

    /**
     * Gets endpoint_type
     *
     * @return string|null
     */
    public function getEndpointType()
    {
        return $this->container['endpoint_type'];
    }

    /**
     * Sets endpoint_type
     *
     * @param string|null $endpoint_type endpoint_type
     *
     * @return $this
     */
    public function setEndpointType($endpoint_type)
    {
        $this->container['endpoint_type'] = $endpoint_type;

        return $this;
    }

    /**
     * Gets every
     *
     * @return string|null
     */
    public function getEvery()
    {
        return $this->container['every'];
    }

    /**
     * Sets every
     *
     * @param string|null $every every
     *
     * @return $this
     */
    public function setEvery($every)
    {
        $this->container['every'] = $every;

        return $this;
    }

    /**
     * Gets offset
     *
     * @return string|null
     */
    public function getOffset()
    {
        return $this->container['offset'];
    }

    /**
     * Sets offset
     *
     * @param string|null $offset offset
     *
     * @return $this
     */
    public function setOffset($offset)
    {
        $this->container['offset'] = $offset;

        return $this;
    }

    /**
     * Gets message_template
     *
     * @return string|null
     */
    public function getMessageTemplate()
    {
        return $this->container['message_template'];
    }

    /**
     * Sets message_template
     *
     * @param string|null $message_template message_template
     *
     * @return $this
     */
    public function setMessageTemplate($message_template)
    {
        $this->container['message_template'] = $message_template;

        return $this;
    }

    /**
     * Gets status
     *
     * @return string|null
     */
    public function getStatus()
    {
        return $this->container['status'];
    }

    /**
     * Sets status
     *
     * @param string|null $status status
     *
     * @return $this
     */
    public function setStatus($status)
    {
        $this->container['status'] = $status;

        return $this;
    }

    /**
     * Gets status_rules
     *
     * @return \InfluxDB2\Model\TemplateSummarySummaryStatusRules[]|null
     */
    public function getStatusRules()
    {
        return $this->container['status_rules'];
    }

    /**
     * Sets status_rules
     *
     * @param \InfluxDB2\Model\TemplateSummarySummaryStatusRules[]|null $status_rules status_rules
     *
     * @return $this
     */
    public function setStatusRules($status_rules)
    {
        $this->container['status_rules'] = $status_rules;

        return $this;
    }

    /**
     * Gets tag_rules
     *
     * @return \InfluxDB2\Model\TemplateSummarySummaryTagRules[]|null
     */
    public function getTagRules()
    {
        return $this->container['tag_rules'];
    }

    /**
     * Sets tag_rules
     *
     * @param \InfluxDB2\Model\TemplateSummarySummaryTagRules[]|null $tag_rules tag_rules
     *
     * @return $this
     */
    public function setTagRules($tag_rules)
    {
        $this->container['tag_rules'] = $tag_rules;

        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     *
     * @param integer $offset Offset
     *
     * @return boolean
     */
    public function offsetExists($offset): bool
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     *
     * @param integer $offset Offset
     *
     * @return mixed
     */
    #[\ReturnTypeWillChange]
    public function offsetGet($offset)
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }

    /**
     * Sets value based on offset.
     *
     * @param integer $offset Offset
     * @param mixed   $value  Value to be set
     *
     * @return void
     */
    public function offsetSet($offset, $value): void
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     *
     * @param integer $offset Offset
     *
     * @return void
     */
    public function offsetUnset($offset): void
    {
        unset($this->container[$offset]);
    }

    /**
     * Gets the string presentation of the object
     *
     * @return string
     */
    public function __toString()
    {
        return json_encode(
            ObjectSerializer::sanitizeForSerialization($this),
            JSON_PRETTY_PRINT
        );
    }
}


